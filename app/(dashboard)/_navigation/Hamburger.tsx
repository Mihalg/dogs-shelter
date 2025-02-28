type HamburgerProps = {
  onClick: () => void;
  isActive: boolean;
};

export default function Hamburger({ onClick, isActive }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className={`hamburger hamburger--collapse absolute right-0 top-[7px] xl:hidden ${isActive ? "is-active pointer-events-none" : ""}`}
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}
