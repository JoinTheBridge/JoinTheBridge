import {
  BookOpen,
  GraduationCap,
  PenTool,
  Settings,
  ClipboardList,
  CircleDollarSign,
  Handshake,
  Megaphone,
  Clapperboard,
  Palette,
  Code,
  FileText
} from "lucide-react";

interface RoleIconProps {
  iconName?: string;
  className?: string;
}

export function RoleIcon({ iconName, className }: RoleIconProps) {
  switch (iconName) {
    case "BookOpen": return <BookOpen className={className} />;
    case "GraduationCap": return <GraduationCap className={className} />;
    case "PenTool": return <PenTool className={className} />;
    case "Settings": return <Settings className={className} />;
    case "ClipboardList": return <ClipboardList className={className} />;
    case "CircleDollarSign": return <CircleDollarSign className={className} />;
    case "Handshake": return <Handshake className={className} />;
    case "Megaphone": return <Megaphone className={className} />;
    case "Clapperboard": return <Clapperboard className={className} />;
    case "Palette": return <Palette className={className} />;
    case "Code": return <Code className={className} />;
    default: return <FileText className={className} />;
  }
}
