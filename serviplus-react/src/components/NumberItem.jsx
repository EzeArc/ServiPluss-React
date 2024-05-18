import styles from "./styles/NumerosItem.module.css";

export default function NumberItem({ title, children }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span
        className={`${styles.number} text-7xl font-bold tabular-nums tracking-tighter`}
      >
        {children}
      </span>
      <span className="uppercase opacity-70">{title}</span>
    </div>
  );
}
