function PageWrapper({ children }) {
  return (
    <div className="flex flex-col items-center justify-start xl:px-10 sm:p-5 relative">
      {children}
    </div>
  );
}

export default PageWrapper;
