import { Hello } from "../enitity/Hello";
import { Query, Resolver } from "type-graphql";


@Resolver(Hello)
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "Hello World";
    }
}