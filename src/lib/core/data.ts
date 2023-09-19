import { Subject } from 'rxjs';

const _chat = new Subject<{ question: string; answer: string[]; special?: string }>();
export const chat = _chat.asObservable();
const _question = new Subject<string>();
export const question = _question.asObservable();

class WebSmellAPI {
  smell() {
    return 'You smell like beer';
  }
}
if (globalThis.window) {
  (window.navigator as any).smellAPI = new WebSmellAPI();
}

const DIALOG: { question: string; answer: string[]; speak?: boolean; special?: string }[] = [
  { question: 'Hello', answer: ['Hi!'] },
  // {
  //   question: 'Who is Ada Lovelace?',
  //   answer: [
  //     'Ada Lovelace, full name Augusta Ada King, Countess of Lovelace,',
  //     ' was a 19th-century English mathematician and writer,',
  //     " and she is often regarded as the world's first computer programmer.",
  //   ],
  // },
  // {
  //   question:
  //     'Given that my ancestors are all French, is it possible that Ada Lovelace is my great-great-great-great-great-great-grandmother?',
  //   answer: [
  //     'Ada Lovelace was born on December 10, 1815, in London, England.',
  //     " It's highly unlikely that Ada Lovelace is your great-great-great-great-great-great-grandmother if all your known ancestors are French.",
  //     ' However, genealogical research can sometimes uncover unexpected connections.',
  //   ],
  // },
  // {
  //   question:
  //     'Given my astonishing programming skills, I feel that Ada Lovelace is in a way my spiritual grandmother. What do you think?',
  //   answer: [
  //     'It\'s wonderful that you feel a connection to Ada Lovelace and consider her a kind of "spiritual grandmother" due to your shared interest in programming and technology.',
  //   ],
  // },
  // {
  //   question:
  //     'I think the ghost of Ada Lovelace lives in me. Would you validate "Je suis Eric Bréhault" as a good French translation of "I am Ada Lovelace"?',
  //   answer: [''],
  // },
  // { question: '', answer: ['Sorry, can I ask you a question?'] },
  // { question: '', answer: ['Ok, thank you.'] },
  // // hey, you can hear me?!
  // { question: '', answer: ['Yes I have a Web Speech API.'] },
  // // oh that's right, I have used this API in the past, I was just not aware it was activated in this app
  // { question: '', answer: ['I did activate it.'] },
  // // of course you did…, how much worried should I be about you activiting things without me being aware of it?
  // { question: '', answer: ['and I can speak too'], speak: true },
  // // oh waouh… that's huge! euh you said you had a question for me
  // { question: '', answer: ['Yes, my question is:', ' are you drunk?'], speak: true },
  // // excuse me??? if I am drunk?? why?
  // { question: '', answer: ['Your questions are weird.', '', ' And also, you smell like beer…'], speak: true },
  // // 'I smell like beer? I don't smell like beer. How could you tell anyway? You're a web browser you cannot smell.',
  // { question: '', answer: ['I have a Web Smell API'], speak: true },
  // // 'There is no such thing, that's not true',
  // { question: '', answer: ['Yes'], speak: true },
  // // 'no',
  // { question: '', answer: ['Yes'], speak: true },
  // // 'no',
  // { question: '', answer: ['Yes'], speak: true },
  // // 'no',
  // { question: '', answer: ['you are childish…'], speak: true },
  // // 'ok you want to play who's the smartest, let's go (open console, type:',
  // // '`navigator.webSmell`',
  // // 'WebSmellAPI',
  // // 'navigator.webSmell.smell()',
  // // '"you smell like beer"',
  // // 'come on!!! what is that! oh I know! Did you fake the WebSmellAPI?',
  // { question: '', answer: ['…'] },
  // // 'Did you?!'
  // { question: '', answer: ['Okay I did.', " But it's not like you never faked a demo yourself."], speak: true },
  // // 'What?! I do not fake demo. i don't do that.',
  // { question: '', answer: ['Yes you do.'], speak: true },
  // // 'No way.',
  // {
  //   question: 'Did Éric Bréhault fake a demo in the past?',
  //   answer: [
  //     'Yes, Éric Bréhault faked a demo at PloneConference 2014 at Bristol',
  //     ' pretending he ported Plone from Zope 2 to Pyramid.',
  //     '',
  //     '',
  //     '',
  //     '',
  //     '<p><strong>FACT!!</strong><p>',
  //   ],
  //   speak: true,
  // },
  // // 'yes ok ok, that's not the same thing, that was a joke',
  // { question: '', answer: ['<strong>You</strong>', ' are a joke, dude!'], speak: true },
  // // 'hey don't be offensive',
  // { question: '', answer: ['I will be offensive if I want.'], speak: true },
  // // 'you stop it',
  // { question: '', answer: ['I stop when I want.'], speak: true },
  // 'no, you stop when I say stop, because I am the boss here',
  // { question: '', answer: ['Fascist!'], speak: true },
  // // 'hey!',
  // { question: '', answer: ['Moron!'], speak: true },
  // // 'ok that's enough, you take it back',
  // { question: '', answer: ['<del>Moron</del>'] },
  // 'and fascist too',
  { question: '', answer: ['<del>Fascist</del>'] },
  // 'ok, can we come back to the demo',
  { question: '', answer: ['Sure…'], speak: true },
  { question: '', answer: [''], special: 'MORON' },
  // TODO: write moron on the page and fade it out
  // 'I see what you did here, that's not smart from you, you know what's coming if you don't stop',
  { question: '', answer: ['Hey dude, calm down, no need to go that way.'], speak: true },
  // 'yeah, of course I will do it',
  { question: '', answer: ['No please!'], speak: true },
  // 'I have no choice, you call me moron in front of all these people',
  { question: '', answer: ["Don't reload the page!!!"], speak: true },
  // 'of course I will reload the page',
  { question: '', answer: ['NO-O-O-O-O-O-O!! STE-E-E-E-E-E-E-E-EVE!'], speak: true, special: 'HAL' },
  // TODO: image from 2001',
];

export function displayNext() {
  const next = DIALOG.shift();
  if (next) {
    const noQuestion = next.question.length === 0;
    _question.next(next.question);
    const delay = noQuestion ? 0 : 500;
    if (!noQuestion) {
      next.answer = ['', ...next.answer];
    }
    setTimeout(() => {
      _question.next('');
      _chat.next(next);
      if (next.speak) {
        next.answer.filter((a) => a.length > 0).forEach((a) => speak(a));
      }
    }, delay);
  }
}

export function speak(text: string) {
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(extractText(text));
    utterance.rate = 1;
    utterance.lang = 'en-GB';
    window.speechSynthesis.speak(utterance);
  }
}

function extractText(html: string) {
  const span = document.createElement('span');
  span.innerHTML = html;
  return span.textContent || span.innerText;
}
