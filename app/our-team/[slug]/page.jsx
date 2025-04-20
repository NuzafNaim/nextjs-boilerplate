import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import qs from "qs";
import Spoiler from "@/components/Spoiler";
import Testimonial from "@/components/Testimonial";
import Link from "next/link";

// Fetch individual team member by slug

async function fetchTeamMember(slug) {
  const query = qs.stringify(
    {
      filters: { slug },
      populate: {
        photo: {
          fields: ["url", "alternativeText", "formats"]
        },
        bodyContent: {
          on: {
            "features.rich-text": { populate: "*" },
            "features.spoiler": { populate: "*" },
            "features.testimonial": { populate: "*" }
          }
        }
      }
    },
    { encodeValuesOnly: true }
  );

  const url = `http://localhost:1337/api/team-members?${query}`;
 // console.log("Fetching:", url);

  const res = await fetch(url);
  const json = await res.json();

 // console.log("API response:", JSON.stringify(json, null, 2));

  return json.data?.[0] || null;
}


  

// Render content blocks
function OurRenderer(item, index) {
  if (item.__component === "features.testimonial") {
    return <Testimonial key={index} data={item} />;
  }

  if (item.__component === "features.spoiler") {
    return <Spoiler key={index} data={item} />;
  }

  if (item.__component === "features.rich-text") {
    return <BlocksRenderer key={index} content={item.content} />;
  }

  return null;
}

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/team-members?populate=*");
  const json = await res.json();

  return json.data.map((member) => ({
    slug: member.slug,
  }));
}
export default async function Page(props) {
    const { slug } = await props.params; // ✅ Await params
   // console.log("slug:", slug);
  
    const member = await fetchTeamMember(slug);
   // console.log("fetched member:", member);
  
    if (!member) {
      return <div className="text-red-500">Team member not found.</div>;
    }


  
    return (
      <div>
        <div className="text-white relative bg-gray-700 px-14 py-16 -mx-8 -mt-7">
          <h2 className="text-6xl font-bold relative z-30">{member.name}</h2>
          {member.photo?.formats?.medium?.url && (
            
              <><img
                        className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
                        src={`http://localhost:1337${member.photo.formats.medium.url}`} /><div className="absolute z-20 w-80 bg-gradient-to-r from-gray-700 to-transparent h-full top-0 bottom-0 left-1/2"></div></>
            
          )}
        </div>
  
        <div className="transform -translate-y-1/2">
          <Link
            href="/our-team"
            className="text-sm bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-300 inline-block rounded-lg py-3 px-5"
          >
            &laquo; Back to all team members
          </Link>
        </div>
  
        <div className="prose max-w-none">
          {member.bodyContent?.map((item, index) => OurRenderer(item, index))}
        </div>
      </div>
    );
  }
  