import React, { useState } from "react";
import Tippy from "@tippyjs/react";

export function LazyTippy(props) {
  const [mounted, setMounted] = useState(false);
  const lazyPlugin = {
    fn: () => ({
      onShow: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps = { ...props };
  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

  if (props.render) {
    computedProps.render = (...args) => (mounted ? props.render(...args) : "");
  } else {
    computedProps.content = mounted ? props.content : "";
  }

  return <Tippy {...computedProps} />;
}
