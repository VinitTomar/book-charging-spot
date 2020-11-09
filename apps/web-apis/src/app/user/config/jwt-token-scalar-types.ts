import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class JwtToken {
  constructor(public value: string) { }
}

@Scalar('JwtToken', () => JwtToken)
export class JwtTokenScalar implements CustomScalar<string, JwtToken> {
  description?: string = "Jwt Token custom scalar type";

  parseValue(value: string) {
    return new JwtToken(value);
  }

  serialize(token: JwtToken) {
    return token.value.toString();
  }


  parseLiteral(ast: ValueNode): JwtToken {
    if (ast.kind === Kind.STRING) {
      return new JwtToken(ast.value);
    }

    return null;
  }

}