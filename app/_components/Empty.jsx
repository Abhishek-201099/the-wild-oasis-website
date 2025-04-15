export default function Empty({ resource }) {
  return (
    <div className="py-5 px-2  flex justify-center items-center">
      <p className="text-accent-50 text-lg">Sorry, No {resource} to show.</p>
    </div>
  );
}
