export default async function EmployeeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <p>Details for employee ID {id}</p>;
}
