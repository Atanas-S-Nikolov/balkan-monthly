import styles from "../styles/Loading.module.css";

import { Loader } from "preact-feather";

export default function Loading() {
    return (
        <section class={styles.loading_section}>
            <Loader class={styles.loader}/>
            <div>Зареждане...</div>
        </section>
    )
}
