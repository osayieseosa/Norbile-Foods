import { useState, useEffect } from "react";

const useScrollPostion = () => {
    const [scrollPostion,setScrollPosition] = useState(0)
    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset)
        }
        window.addEventListener("scroll", updatePosition)
        updatePosition()
        return () => window.removeEventListener("scroll", updatePosition)

    },[])
  return scrollPostion
}

export default useScrollPostion