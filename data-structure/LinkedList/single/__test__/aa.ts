import SingleNoCircleLinkedList from "../SingleNoCircleLinkedList";

const linkedList = new SingleNoCircleLinkedList<Number>();
linkedList.add(11);
linkedList.add(22);
linkedList.add(33);
linkedList.add(44);
linkedList.add(1);

console.log(linkedList.toString())
