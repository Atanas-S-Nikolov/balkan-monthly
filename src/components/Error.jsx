import { AlertCircle } from "preact-feather";
import styles from "../styles/Error.module.css";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Error() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const alertIconSize = isMobile ? 16 : 24;

  return (
    <section class={styles.error_section}>
      <AlertCircle class={styles.alert_icon} size={alertIconSize} />
      Възникна грешка! Моля опитайте отново.
    </section>
  );
}
