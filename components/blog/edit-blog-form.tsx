import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EditBlogForm() {
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Edit Blog</FieldLegend>
            <FieldDescription>Edit your ideas not a problem</FieldDescription>
          </FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" placeholder="Enter blog title" />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="image_url">Image Url</FieldLabel>
              <Input id="image_url" placeholder="Paste your blog image url" />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Draft" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="content">Blog Content</FieldLabel>
              <Textarea
                id="content"
                placeholder="Write out your ideas"
                className="resize-none"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field orientation={"horizontal"}>
              <Button type="submit">Save</Button>
              <Button asChild variant={"destructive"} type="button">
                <Link href="/">Cancel</Link>
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
