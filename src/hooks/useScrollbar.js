import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const config = {
  scrollbars: {
    theme: 'os-theme-light',
    visibility: 'auto',
    autoHideDelay: 1300,
    dragScroll: true,
    clickScroll: false,
    pointers: ['mouse', 'touch', 'pen'],
  },
}

const useScrollbar = (root, hasScroll) => {
  useEffect(() => {
    let scrollbars;

    if (root.current) {
      scrollbars = OverlayScrollbars(root.current, config);
    }

    return () => {
      if(scrollbars){
        scrollbars.destroy()
      }
    }
  }, [root]);

};

export { useScrollbar };
