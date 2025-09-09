import { authenticatedGraphQLClient } from "@/graphql";
import { UserInfoByLoginContextResponse } from "@/types/api/graphql/user-type";

export const UserInfoByLoginContextDocument = `
    query UserInfoByLoginContext {
      UserInfoByLoginContext {
        ID
        LoginEmail
        UserName
        HPNo
        IsResearcher
        CreatedBy
        CreatedAt
        ModifiedBy
        ModifiedAt
        UserType {
          ID
          Subject
        }
        UserInfo {
          ID
          UserID
          PersonName
          NRIC
          Passport
          Address1
          Address2
          Postcode
          City
          State
          StateCode
          Country
          CountryCode
          Dob
          Gender
          HeightCM
          WeightKG
          PhotoURL
          ModifiedAt
        }
      }
      FollowerListing {
        ID
        LoginEmail
      }
      FollowingListing {
        ID
        LoginEmail
      }
    }
`;

export const fetchUserInfoByLoginContextApi = async() => {
    try{
        const response = await authenticatedGraphQLClient<{UserInfoByLoginContext: UserInfoByLoginContextResponse}>(UserInfoByLoginContextDocument);

        return response.UserInfoByLoginContext;
    }
    catch(error){
        console.error("Fetch User Info By Login Context Error:", error);
        throw error;
    }
}