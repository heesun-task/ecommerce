export default function Home() {
  return (
    <div className="">
      <div
        className="relative bg-cover bg-center text-white min-h-130 flex items-center justify-center mb-12"
        style={{ backgroundImage: `url('/images/')` }}
      >
        <span className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />
        {/* <Container className="relative z-20">
          <ProductBreadcrumbs items={breadcrumbs} />
          <h2 className="text-3xl font-bold font-serif mb-3 mt-3">{title}</h2>
          <p className="whitespace-pre-line">{description}</p>
          {children}
        </Container> */}
      </div>
    </div>
  );
}
