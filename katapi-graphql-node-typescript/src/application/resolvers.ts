interface Subject {
 subject: string
}

export default {
  Query: {
    hello(obj: any, subject :Subject ) {
      return `Hello, ${subject}! from Server`;
    }
  }
};
