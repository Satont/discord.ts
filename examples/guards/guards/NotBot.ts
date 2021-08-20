import { ArgsOf, GuardFunction } from "../../../src";
import {
  CommandInteraction,
  Message,
  MessageReaction,
  VoiceState,
} from "discord.js";

// Example by @AndyClausen

export const NotBot: GuardFunction<
  | ArgsOf<"messageCreate" | "messageReactionAdd" | "voiceStateUpdate">
  | CommandInteraction
> = async (arg, client, next) => {
  const argObj = arg instanceof Array ? arg[0] : arg;
  const user =
    argObj instanceof CommandInteraction
      ? argObj.user
      : argObj instanceof MessageReaction
      ? argObj.message.author
      : argObj instanceof VoiceState
      ? argObj.member?.user
      : argObj instanceof Message
      ? argObj.author
      : argObj.message.author;
  if (!user?.bot) {
    await next();
  }
};
