import { PropertyDetailView } from "@/components/dashboard/PropertyDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <PropertyDetailView id={Number(id)} />;
}
