
import Nav from "@/pages/component/home/Nav"
import BookingForm from "@/pages/component/home/BookingForm"
import Footer from "@/pages/component/home/Footer"




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className="antialiased"
      >
            <Nav></Nav>
              <BookingForm></BookingForm>
        {children}
          <Footer></Footer>
      </div>
  
  );
}
