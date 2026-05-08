import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // بنجيب مسار الصفحة الحالي (pathname)
  const { pathname } = useLocation();

  useEffect(() => {
    // أول ما المسار يتغير، بنقول للمتصفح اطلع لصفر بكسل فوق
    window.scrollTo(0, 0);
  }, [pathname]); // الـ Effect ده هيشتغل كل ما الـ pathname يتغير

  return null; // الكومبوننت ده مش بيرندر حاجة، هو بس بينفذ أمر السكرول
};

export default ScrollToTop;