import "./ContentCard.scss";

export default function ContentCard({ item }) {
  return (
    <div className="content-card">
      <img src={item.imagePath} alt={item.title} />
      <div className="details">
        <div className="title">{item.title}</div>
        <div className="creator">{item.creator}</div>
        <div className="status">
          {item.pricingOption === 1 ? "FREE" : `$${item.price.toFixed(2)}`}
        </div>
      </div>
    </div>
  );
}
