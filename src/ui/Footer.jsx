import Logo from "./Logo";

function Footer() {
  return (
    <div className="bg-black p-4 text-white">
      <Logo />
      <div className="my-4">
        <h1>Bize Ulaşın</h1>
        <p>Telefon Numaramız: +90 535 733 75 92 </p>
        <p>Email: antikajans@yahoo.com</p>
      </div>
      <div className="flex flex-col gap-4 text-center text-sm">
        <p>
          Bu web sitesinde yer alan tüm fotoğraflar ve içerikler, Koray Cüneyt
          Deniz'e ait olup, telif hakları saklıdır. İzin olmadan bu
          materyallerin çoğaltılması, paylaşılması veya herhangi bir şekilde
          kullanılmasına yönelik her türlü eylem yasal olarak cezai yaptırımlara
          tabi olabilir.
        </p>
        <p>
          Lütfen bu içeriklerin yalnızca kişisel kullanım amaçlı görüntülenmesi
          gerektiğini ve ticari amaçlarla kullanımının yasak olduğunu unutmayın.
          İçeriklerin izinsiz kullanımı veya paylaşımı, yasal sorumluluk
          doğurabilir. Anlayışınız için teşekkür ederiz.
        </p>
      </div>
    </div>
  );
}

export default Footer;
