function BlogPreview({ title, content, imageUrl }) {
  return (
    <div className="card bg-base-100 shadow-sm">
      {imageUrl && (
        <figure>
          <img src={imageUrl} alt="Shoes" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default BlogPreview;
