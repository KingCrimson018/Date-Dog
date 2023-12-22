import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();

export const onFollowUser = functions.firestore
  .document("follow/{id}")
  .onCreate(async (snapshot) => {
    const fInfo = snapshot.data();

    const frRef = admin.firestore().collection("users").doc(fInfo.followerId);
    const fdRef = admin.firestore().collection("users").doc(fInfo.followedId);

    const followerInfo = (await (await frRef).get()).data() || {};
    const followerFollowedsCant = followerInfo.followedsCant;

    const followedInfo = (await fdRef.get()).data() || {};
    const followedFollowersCant = followedInfo.followersCant;


    frRef.update({followedsCant: followerFollowedsCant + 1});
    fdRef.update({followersCant: followedFollowersCant + 1});

    const FFN = fInfo.followerInfo.followerFirstName;
    const FLN = fInfo.followerInfo.followerLastName;
    const msg = {
      token: followedInfo.fcmToken,
      notification: {
        title: "Nuevo Seguidor",
        body: `El usuario ${FFN} ${FLN} ha iniciado a seguirte`,
        imageUrl: fInfo.followerInfo.followerImgUrl,
      },
    };
    admin.messaging().send(msg);
  });

export const onUnfollowUser = functions.firestore
  .document("follow/{id}")
  .onDelete(async (snapshot) => {
    const fInfo = snapshot.data();

    const frRef = admin.firestore().collection("users").doc(fInfo.followerId);
    const fdRef = admin.firestore().collection("users").doc(fInfo.followedId);

    const followerInfo = (await (await frRef).get()).data() || {};
    const followerFollowedsCant = followerInfo.followedsCant;

    const followedInfo = (await fdRef.get()).data() || {};
    const followedFollowersCant = followedInfo.followersCant;

    frRef.update({followedsCant: followerFollowedsCant - 1});
    fdRef.update({followersCant: followedFollowersCant - 1});
  });

export const onFollowDog = functions.firestore
  .document("follow-dogs/{id}")
  .onCreate(async (snapshot) => {
    const fInfo = snapshot.data();

    const frRef = admin.firestore().collection("users").doc(fInfo.followerId);
    const dRef = admin.firestore().collection("dogs").doc(fInfo.dogId);

    const followerInfo = (await (await frRef).get()).data() || {};
    const followerFollowedsCant = followerInfo.dogsFollowedCant;

    const dogInfo = (await (await dRef).get()).data() || {};
    const dogFollowersCant = dogInfo.followersCant;

    frRef.update({dogsFollowedCant: followerFollowedsCant + 1});
    dRef.update({followersCant: dogFollowersCant + 1});

    const FFN = fInfo.followerInfo.followerFirstName;
    const FLN = fInfo.followerInfo.followerLastName;

    const token = fInfo.dogInfo.ownerFcmToken;

    if (token) {
      const msg = {
        token: token,
        notification: {
          title: "Nuevo seguidor para tu mascota",
          body: `El usuario ${FFN} ${FLN} ahora sigue a ${dogInfo.name}`,
          imageUrl: fInfo.followerInfo.followerImgUrl,
        },
      };
      admin.messaging().send(msg);
    }
  });

export const onUnfollowDog = functions.firestore
  .document("follow-dogs/{id}")
  .onDelete(async (snapshot) => {
    const fInfo = snapshot.data();

    const frRef = admin.firestore().collection("users").doc(fInfo.followerId);
    const dRef = admin.firestore().collection("dogs").doc(fInfo.dogId);

    const followerInfo = (await (await frRef).get()).data() || {};
    const followerFollowedsCant = followerInfo.dogsFollowedCant;

    const dogInfo = (await (await dRef).get()).data() || {};
    const dogFollowersCant = dogInfo.dogsFollowedCant;

    frRef.update({dogsFollowedCant: followerFollowedsCant - 1});
    dRef.update({followersCant: dogFollowersCant - 1});
  });

export const onCreateDog = functions.firestore
  .document("dogs/{id}")
  .onCreate(async (snapshot) => {
    const dogInfo = snapshot.data();
    const oRef = admin.firestore().collection("users").doc(dogInfo.ownerId);

    const ownerInfo = (await oRef.get()).data() || {};
    const dogsCant = ownerInfo.dogsCant;

    oRef.update({dogsCant: dogsCant + 1});
  });

export const onUpdateDog = functions.firestore
  .document("dogs/{id}")
  .onUpdate(async (snapshot) => {
    const dogInfo = snapshot.after.data();
    const dogInfoBefore = snapshot.before.data();

    const heatBefore = dogInfoBefore.heat;
    const heatAfter = dogInfo.heat;

    if (heatBefore != heatAfter) {
      const ref = admin.firestore().collection("follow-dogs");
      const follow = (await ref.where("dogId", "==", dogInfo.id).get()).docs;
      follow.forEach((follower) => {
        const msg = {
          token: follower.data().followerInfo.followedFcmToken,
          notification: {
            title: `${dogInfo.name} is on heat now`,
            body: "Check the dog status",
          },
        };
        admin.messaging().send(msg);
      });
    }
  });

export const onDisableDog = functions.firestore
  .document("dogs/{id}")
  .onDelete(async (snapshot) => {
    const dogInfo = snapshot.data();
    const oRef = admin.firestore().collection("users").doc(dogInfo.ownerId);

    const ownerInfo = (await oRef.get()).data() || {};
    const dogsCant = ownerInfo.dogsCant;

    oRef.update({dogsCant: dogsCant - 1});
  });
