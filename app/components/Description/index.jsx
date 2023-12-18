import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import { TypeAnimation } from "react-type-animation";
import Rounded from "../../common/RoundedButton";
export default function Description() {
  const phrase =
    "I'm a computer science undergraduate student with a strong commitment to learning and good teamwork skills. I've been involved in website development projects and have experience with Laravel, Reactjs, Nextjs, and MySQL. I'm also familiar with programming languages like Python, C++, Java, and Go.";
  const description = useRef(null);
  const isInView = useInView(description);
  return (
    <div ref={description} className={styles.description} id="about">
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          <TypeAnimation
            sequence={[
              "Skills: ReactJS, NextJS, Bootstrap, Tailwind, HTML, CSS.",
              3000,
              "Skills: Laravel, PHP, Java, Golang, C++ ",
              1000,
              //"Keterampilan : Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <Rounded className={styles.button}>
            <p>About me</p>
          </Rounded>
        </div>
      </div>
    </div>
  );
}
