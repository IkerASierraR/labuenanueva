interface Window {
  uptDesktop?: {
    openExternal: (url: string) => void;
    setWindowControls?: (options: {
      resizable?: boolean;
      maximizable?: boolean;
      size?: { width: number; height: number };
    }) => void;
  };
}