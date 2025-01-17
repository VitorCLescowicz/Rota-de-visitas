interface CardProps {
    title: string;
    description: string;
    image: string;
  }
  
  const Card = ({ title, description, image }: CardProps) => {
    return (
      <div className="border rounded-lg p-4">
        <img src={image} alt={title} className="rounded-md" />
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default Card;
  