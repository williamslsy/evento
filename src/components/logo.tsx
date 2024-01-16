import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <Image src="https://bytegrad.com/course-assets/react-nextjs/evento.png" width={53} height={12} alt="Evento" />
    </Link>
  );
  // the Image component is useful because it automatically optimizes the image for the web
  // the Image component also automatically lazy loads the image
  // also adding a width and height to the image, prevents content layout shift (CLS) i.e the page jumping around.
  // but if you have the image sitting in your file system, you can use the img tag instead and you might not need to specify the width and height.
}

export default Logo;
