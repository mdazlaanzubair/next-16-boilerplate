"use client";

import { useCurrentUser } from "@/data/queries/services/user/call-hooks";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserFullInterface } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Building2,
  Wallet,
  CreditCard,
  Phone,
  Fingerprint,
  Eye,
  EyeOff,
} from "lucide-react";

export default function UserDetails() {
  const router = useRouter();
  const [user, setUser] = useState<UserFullInterface | null>(null);
  const [showSensitive, setShowSensitive] = useState(false);
  const { data, isError, isLoading } = useCurrentUser();

  useLayoutEffect(() => {
    if (isError) {
      router.push("/login");
    } else if (data) {
      setUser(data.data);
    }
  }, [data, isError, router]);

  if (isLoading || !user) {
    return <UserDetailsSkeleton />;
  }

  const maskCount = (len: number) => "*".repeat(Math.max(0, len));

  const safeDisplay = (
    value: string,
    type: "text" | "card" | "email" = "text"
  ) => {
    if (showSensitive) return value;
    if (type === "card") return `**** **** **** ${value.slice(-4)}`;
    if (type === "email") {
      const [local, domain] = value.split("@");
      return `${local.slice(0, 2)}***@${domain}`;
    }
    return maskCount(8); // Default mask length
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-5xl">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
            <AvatarImage src={user.image} alt={user.username} />
            <AvatarFallback className="text-2xl">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <Badge
                variant={user.role === "admin" ? "destructive" : "secondary"}
              >
                {user.role}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="text-foreground font-medium">
                @{user.username}
              </span>
              <span>•</span>
              <span>{safeDisplay(user.email, "email")}</span>
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowSensitive(!showSensitive)}
          className="gap-2"
        >
          {showSensitive ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showSensitive ? "Hide Sensitive Data" : "Show Sensitive Data"}
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-primary" />
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-muted-foreground">Age</div>
              <div className="font-medium">{user.age} Years</div>

              <div className="text-muted-foreground">Birth Date</div>
              <div className="font-medium">{user.birthDate}</div>

              <div className="text-muted-foreground">Blood Group</div>
              <div className="font-medium">{user.bloodGroup}</div>

              <div className="text-muted-foreground">Height</div>
              <div className="font-medium">{user.height} cm</div>

              <div className="text-muted-foreground">Weight</div>
              <div className="font-medium">{user.weight} kg</div>

              <div className="text-muted-foreground">Eye Color</div>
              <div className="font-medium">{user.eyeColor}</div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Contact & Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-muted-foreground">
                  {safeDisplay(user.phone)}
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div>
                <div className="font-medium">Home Address</div>
                <div className="text-muted-foreground">
                  {user.address.address}
                </div>
                <div className="text-muted-foreground">
                  {user.address.city}, {user.address.state}{" "}
                  {user.address.postalCode}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Employment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                Company
              </div>
              <div className="font-semibold text-base">{user.company.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  Department
                </div>
                <div>{user.company.department}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  Title
                </div>
                <div>{user.company.title}</div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-md text-xs">
              <MapPin className="w-3 h-3 inline mr-1" />
              {user.company.address.address}, {user.company.address.city}
            </div>
          </CardContent>
        </Card>

        {/* Financial */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Financial & Crypto
            </CardTitle>
            <CardDescription>
              Sensitive financial information masked for security.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-4 flex flex-col justify-between bg-card hover:bg-accent/50 transition-colors cursor-default">
              <div className="flex justify-between items-start mb-4">
                <CreditCard className="w-8 h-8 opacity-50" />
                <span className="font-mono text-xl tracking-widest">
                  {safeDisplay(user.bank.cardNumber, "card")}
                </span>
              </div>
              <div className="flex justify-between items-end text-sm">
                <div>
                  <div className="text-muted-foreground text-xs">
                    Card Holder
                  </div>
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground text-xs">Expires</div>
                  <div className="font-medium">{user.bank.cardExpire}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">IBAN</div>
                <code className="text-xs bg-muted p-2 rounded block break-all font-mono">
                  {safeDisplay(user.bank.iban)}
                </code>
              </div>
              <div>
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Crypto Wallet</span>
                  <Badge variant="outline" className="text-[10px] h-5">
                    {user.crypto.coin}
                  </Badge>
                </div>
                <code className="text-xs bg-muted p-2 rounded block break-all font-mono">
                  {safeDisplay(user.crypto.wallet)}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserDetailsSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-5xl">
      <div className="flex items-center gap-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
