import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";

export default function QuestionImageGenerator() {
  const [bgImage, setBgImage] = useState(null);
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [theoreticalQ, setTheoreticalQ] = useState("");
  const stageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = uri;
    link.download = "question_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [image] = useImage(bgImage);

  return (
    <div className="p-4 flex flex-col items-center">
      <Card className="p-4 w-full max-w-lg">
        <CardContent>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          <Input className="mt-2" placeholder="One-word Question 1" value={question1} onChange={(e) => setQuestion1(e.target.value)} />
          <Input className="mt-2" placeholder="One-word Question 2" value={question2} onChange={(e) => setQuestion2(e.target.value)} />
          <Input className="mt-2" placeholder="Theoretical Question" value={theoreticalQ} onChange={(e) => setTheoreticalQ(e.target.value)} />
          <Button className="mt-4 w-full" onClick={handleDownload}>Download Image</Button>
        </CardContent>
      </Card>
      <Stage ref={stageRef} width={500} height={500} className="mt-4 border rounded-lg">
        <Layer>
          {image && <Image image={image} width={500} height={500} />}
          <Text text="One-word Answer Questions" x={50} y={50} fontSize={20} fill="black" />
          <Text text={`1. ${question1}`} x={50} y={90} fontSize={18} fill="black" />
          <Text text={`2. ${question2}`} x={50} y={120} fontSize={18} fill="black" />
          <Text text="Theoretical Question" x={50} y={180} fontSize={20} fill="black" />
          <Text text={`1. ${theoreticalQ}`} x={50} y={220} fontSize={18} fill="black" />
        </Layer>
      </Stage>
    </div>
  );
}
