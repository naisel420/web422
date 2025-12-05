export default function PageHeader({ text, subtext }) {
  return (
    <>
      <div className="p-4 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-4">{text}</h1>
        {subtext && <p className="lead">{subtext}</p>}
      </div>
    </>
  );
}