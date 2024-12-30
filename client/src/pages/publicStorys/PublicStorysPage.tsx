import CardPublic from "../../components/card/CardPublic";
import bok from "../../assets/bok.jpg"
import groda from "../../assets/groda.jpg"
import buss from "../../assets/buss.jpg"
import pyramid from "../../assets/pyramid.jpg"
import sagolandet from "../../assets/sagolandet.jpg"
import tunnel from "../../assets/tunnel.jpg"
import styles from "./publicStorysPage.module.scss"

const PublicStorysPage = () => {
  return (
    <div className={styles.publicstory}>
    <CardPublic imgs={bok} title={"Bokresan"}/>
    <CardPublic imgs={buss} title={"Bussens färd"}/>
    <CardPublic imgs={groda} title={"Grodan som blev en prins"}/>
    <CardPublic imgs={pyramid} title={"Under pyraiderna"}/>
    <CardPublic imgs={sagolandet} title={"I sagans värld"}/>
    <CardPublic imgs={tunnel} title={"tunnel som leder till nästa tunnel"}/>
    <CardPublic imgs={bok} title={"Bokresan"}/>
    <CardPublic imgs={buss} title={"Bussens färd"}/>
    <CardPublic imgs={groda} title={"Grodan som blev en prins"}/>
    </div>
  )
};

export default PublicStorysPage;
