import Tippy from "@tippyjs/react";
import { useEffect, useRef } from "react";

export const DynamicStyleTippyComponent = ({ children, content, tippyOptions = {} }) => {
  const styleId = 'x-cards-dropdown-styles';
  const tippyRef = useRef(null);

  useEffect(() => {
    // Check if the style element already exists
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      // If it doesn't exist, create it
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Define your styles
    const styles = `
     .tippy-box[data-theme~='custom'] {
 --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --ring: 240 4.9% 83.9%;

  background-color: black;
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  overflow: hidden;
  animation: scaleIn 0.2s ease-out;
}

.tippy-box[data-theme~='custom'] .tippy-content {
  padding: 4px;
  min-width: 152px;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 4px;
  user-select: none;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item.no-hover:hover {
  background-color: transparent;
  color: hsl(var(--foreground));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item:active {
  background-color: hsl(var(--muted));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-icon  {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  color: var(--muted-foreground);
  transition: color 0.2s;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-icon:hover  {
  color: hsl(var(--accent-foreground));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-separator {
  display: flex;
  align-items: center;
  text-align: center;
  // margin: 10px 0;
}


.tippy-box[data-theme~='custom'] .dropdown-menu-separator::before,
.tippy-box[data-theme~='custom'] .dropdown-menu-separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid hsl(var(--border));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-separator::before {
  margin-right: 0.5em;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-separator::after {
  margin-left: 0.5em;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-separator-text {
  padding: 0 10px;
  font-size: 0.85em;
  color: hsl(var(--muted-foreground));
  white-space: nowrap;
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item.danger {
  color: hsl(var(--destructive-foreground));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item.danger:hover {
  background-color: hsl(var(--destructive));
}

.tippy-box[data-theme~='custom'] .dropdown-menu-item.danger svg {
  color: var(--destructive-foreground);
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
        `;

    // Set the styles
    styleElement.textContent = styles;

    // Cleanup function
    return () => {
    };
  }, []);




  return (
    <Tippy
      ref={tippyRef}
      content={content}
      interactive={true}
      appendTo={document.body}
      placement="top-start"
      theme="custom" // Use our custom theme
      {...tippyOptions}
    >
      {children}
    </Tippy>
  );
};