import { useEffect, useRef } from "react";

export default function useClickOutside(close, listen = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // ref.current.contains(e.target) so this will bascially b etrue only when user clicks inside the Modal for modal children but false for outside elements so neagtion gives true for outside elements and this will make the modal close
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", handleClick, listen);
      return () => document.removeEventListener("click", handleClick, listen);
    },
    [close, listen]
  );
  return ref;
}
