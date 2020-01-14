import {client} from "../../../apollo";
import gql from "graphql-tag";

class ActivityService {
    async getList(): Promise<Array<any>> {
        try {
            const {data} = await client.query({
                query: gql`{
                    viewer{
                        activityrecordconnection(page:{last:10},orderBy:id_desc){
                            edges{
                                node{
                                    id
                                    type
                                    title
                                    code
                                    url
                                }
                            }
                        }
                    }
                }`
            });
            console.log(data);
            return data.viewer.activityrecordconnection.edges.map((it: any) => it.node)
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async create(param: { code: string; type: string; title: string; url: string }): Promise<any | null> {
        try {
            const {data, errors} = await client.mutate({
                mutation: gql`mutation activity_create($type:String!,$title:String,$code:String,$url:String) {
                    activity{
                        create(type:$type,title:$title,code:$code,url:$url){
                            id
                        }
                    }
                }`,
                variables: {
                    ...param
                }
            });
            console.log(`data:${JSON.stringify(data)}`);
            if (errors?.length) {
                throw new Error(`${errors}`)
            }
            return {id: data.activity.create.id}
        } catch (e) {
            console.error(e);
            console.log(e.message, e);
            return null;
        }
    }
}

let activityService = new ActivityService();
export default activityService;
