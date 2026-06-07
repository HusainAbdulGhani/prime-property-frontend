import { apiRequest } from "@/lib/api/client";
import type {
  PaginatedProperties,
  Property,
  PropertyPayload,
  PropertyQueryParams,
} from "@/types/property";

function buildQueryParams(params: PropertyQueryParams): Record<string, string> {
  const query: Record<string, string> = {};

  if (params.page) query.page = String(params.page);
  if (params.per_page) query.per_page = String(params.per_page);
  if (params.search) query.search = params.search;
  if (params.lebar_min !== undefined) query.lebar_min = String(params.lebar_min);
  if (params.price_max !== undefined) query.price_max = String(params.price_max);
  if (params.tipe) query.tipe = params.tipe;
  if (params.status) query.status = params.status;
  if (params.sort_by) query.sort_by = params.sort_by;
  if (params.sort_dir) query.sort_dir = params.sort_dir;
  if (params.carport !== undefined) query.carport = String(params.carport);

  if (params.kawasan?.length) query.kawasan = params.kawasan.join(",");
  if (params.hadap?.length) query.hadap = params.hadap.join(",");
  if (params.siap?.length) query.siap = params.siap.join(",");

  return query;
}

export async function fetchProperties(
  params: PropertyQueryParams = {},
): Promise<PaginatedProperties> {
  return apiRequest<PaginatedProperties>({
    method: "GET",
    url: "/api/properties",
    params: buildQueryParams(params),
  });
}

export async function fetchPropertyById(id: number): Promise<Property | null> {
  let page = 1;
  let lastPage = 1;

  do {
    const response = await fetchProperties({ page, per_page: 100 });
    const found = response.data.find((property) => property.id === id);
    if (found) return found;
    lastPage = response.last_page;
    page += 1;
  } while (page <= lastPage);

  return null;
}

export async function createProperty(
  payload: PropertyPayload,
): Promise<{ message: string; data: Property }> {
  return apiRequest(
    { method: "POST", url: "/api/properties", data: payload },
    { requireCsrf: true },
  );
}

export async function updateProperty(
  id: number,
  payload: PropertyPayload,
): Promise<{ message: string; data: Property }> {
  return apiRequest(
    { method: "PUT", url: `/api/properties/${id}`, data: payload },
    { requireCsrf: true },
  );
}

export async function deleteProperty(id: number): Promise<{ message: string }> {
  return apiRequest(
    { method: "DELETE", url: `/api/properties/${id}` },
    { requireCsrf: true },
  );
}
