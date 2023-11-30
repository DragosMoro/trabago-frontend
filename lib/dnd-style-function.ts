export function getStyle(style:any, snapshot:any) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.0000001s`,
    };
  }