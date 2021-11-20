const Layout: React.FCX<{
  title?: string
}> = ({ children }) => (

  <main className="min-h-screen grid place-content-center">
    {children}
  </main>

);

export default Layout;
