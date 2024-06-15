import { AlertCircle } from "preact-feather";
import styles from "../styles/Error.module.css";

export default function Error() {
    return (
        <section class={styles.error_section}>
            <AlertCircle class={styles.alert_icon}/>
            Възникна грешка! Моля опитайте отново.
        </section>
    )
}
