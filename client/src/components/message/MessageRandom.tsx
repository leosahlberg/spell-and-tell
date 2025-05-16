import { useEffect, useState } from "react";
import style from "./messagerandom.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MessageRandom = () => {
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);

  const messages = [
    `Bra jobbat, ${user?.name}! ✍️`,
    `Skapa nytt, ${user?.name}! 🚀`,
    "Berättelsen väntar! 📖",
    "Fantasin flödar! ✨",
    `Fortsätt med din idé ! 💡`,
    "Din historia räknas! 🖋️",
    "Skriv vidare! 📚",
    `Magi på gång! ✨`,
    "Din fantasi – dina regler! 🌟",
    "Gör det unikt! 🔥",
    `Snyggt jobbat, ${user?.username}! 🖋️`,
    "Nytt kapitel? 📜",
    "Din berättelse lever! ✨",
    "Redo för nästa del? 📝",
    `Sätt igång, ${user?.name}! 🌍`,
    "Skapa mer! 💫",
    "Dela din värld! 🌟",
  ];
  

  useEffect(() => {
    if (user) {
      const lastMessageIndex = localStorage.getItem("lastMessageIndex");

      if (lastMessageIndex === null) {
        setMessageIndex(0);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          localStorage.setItem("lastMessageIndex", "0");
        }, 6000);
      } else {
        const nextIndex = (parseInt(lastMessageIndex) + 1) % messages.length;
        setMessageIndex(nextIndex);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          localStorage.setItem("lastMessageIndex", nextIndex.toString());
        }, 4000);
      }
    }
  }, [user, messageIndex, messages.length]);

  if (!open) return null;

  return (
    <div className={style.welcomebubble}>
      <div className={style.bubblearrow}></div>
      {messages[messageIndex]}
    </div>
  );
};

export default MessageRandom;
