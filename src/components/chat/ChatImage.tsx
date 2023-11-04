import { IMAGE_SIZE } from "@/utils/constants";
import Image from "next/image";
import { memo } from "react";

type Props = {
    image?: string
}
export default memo(function ChatImage({ image }: Props) {
    if(!image?.startsWith('data:image/png;base64')) {
        return null;
    }
    return <section className="mt-4">
        <label className="italic">Final state of Game of Life:</label>
        <Image
            src={image}
            alt="final state of Game of Life"
            width={IMAGE_SIZE.width}
            height={IMAGE_SIZE.height}
            className='border rounded'
        />
    </section>
});