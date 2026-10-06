import { postType } from "./postType";
import { storyType } from "./storyType";
import { programType } from "./programType";
import { partnerType } from "./partnerType";
import { siteSettingsType } from "./siteSettingsType";
import { photoType } from "./photoType";
import { videoType } from "./videoType";
import { newsType } from "./newsType";
import { reportType } from "./reportType";
import { teamMemberType } from "./teamMemberType";
import { homepageTrustContentType } from "./homepageTrustContentType";
import { jobsContentType } from "./jobsContentType";
import { causeType } from "./causeType";
import { testimonialType } from "./testimonialType";
import { servicePackageType } from "./servicePackageType";

export const schemaTypes = [
  // Site 1: Generation Aid Core
  postType,
  storyType,
  programType,
  causeType,
  testimonialType,
  partnerType,
  teamMemberType,
  newsType,
  reportType,
  videoType,
  photoType,
  siteSettingsType,
  homepageTrustContentType,

  // Site 2: Generation Jobs Core
  jobsContentType,
  servicePackageType,
];
