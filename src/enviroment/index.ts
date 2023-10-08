const URL_DEV_LOCAL: string = 'http://192.168.1.18:1337';
const URL_PRD: string = 'http://203.161.61.90:1340';

const ENV = {
  DEV_LOCAL: {URL: URL_DEV_LOCAL},
  PRD: {URL: URL_PRD},
};

export default ENV.PRD;
