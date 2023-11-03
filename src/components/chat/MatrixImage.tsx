import { Matrix } from "@/types/types"
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    matrix:Matrix
    width?:number
    height?:number
}

export default function MatrixImage({ matrix, width = 300, height = 300 }:Props) {
    const [image, setImage] = useState('');
    useEffect(() => {
        fetch(`/api/image`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                matrix, width, height
            }),
        })
          .then((res) => res.json())
          .then(({ image }) => setImage(image))
          .catch(e => console.error(e));
    },[height, matrix, width])

    return (image.startsWith('data') && <Image
        src={image}
        alt="image of matrix"
        width={width}
        height={height}
        className='border rounded'
        />
    );
}