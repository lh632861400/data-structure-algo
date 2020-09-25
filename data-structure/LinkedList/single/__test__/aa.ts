import SingleNoCircleLinkedList from "../SingleNoCircleLinkedList";
import DuplxNoCircleLinkedList from "../../duplx/DuplxNoCircleLinkedList";

const linkedList = new DuplxNoCircleLinkedList<Number>();
linkedList.add(11);
linkedList.add(22);
linkedList.add(33);
linkedList.add(44);
linkedList.add(1);

console.log(linkedList.toString())
