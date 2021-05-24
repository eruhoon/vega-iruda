export interface Rule<Source, Message> {
  match(src: Srouce): boolean;
  makeMessage(src: Source): Promise<Message>;
}
