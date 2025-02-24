export function Arrow({ rotated }) {
  const className = rotated ? "-rotate-180" : "";

  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        stroke="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m13.04 1.429 10.218 10.216a.5.5 0 0 1 0 .708L13.04 22.571a.5.5 0 0 1-.707 0l-2.756-2.756a.5.5 0 0 1-.014-.693L14.1 14.5h-13a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h13L9.566 4.878a.5.5 0 0 1 .012-.7l2.755-2.754a.5.5 0 0 1 .707.005Z"
      ></path>
    </svg>
  );
}
