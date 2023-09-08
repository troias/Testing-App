export default function scoopOptions({
  name,
  imagePath,
}: {
  name: string;
  imagePath: string;
}) {
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </div>
  );
}
