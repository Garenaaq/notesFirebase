import { Box, Button, HStack } from "@chakra-ui/react";
import { useEditorState, type Editor } from "@tiptap/react";

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <Box zIndex={1}>
      <HStack flexWrap="wrap" gap={4}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          bgColor={editorState.isBold ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Bold
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          bgColor={editorState.isItalic ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          bgColor={editorState.isStrike ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Strike
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          bgColor={editorState.isCode ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Code
        </Button>
        <Button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          bgColor="gray.600"
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Clear marks
        </Button>
        <Button
          onClick={() => editor.chain().focus().clearNodes().run()}
          bgColor="gray.600"
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Clear nodes
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          bgColor={editorState.isParagraph ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Paragraph
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          bgColor={editorState.isHeading1 ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          bgColor={editorState.isHeading2 ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          bgColor={editorState.isHeading3 ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          bgColor={editorState.isHeading4 ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          H4
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          bgColor={editorState.isHeading5 ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          H5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          bgColor={editorState.isHeading6 ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          H6
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          bgColor={editorState.isBulletList ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Bullet list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          bgColor={editorState.isOrderedList ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Ordered list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          bgColor={editorState.isCodeBlock ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          bgColor={editorState.isBlockquote ? "gray.700" : "gray.600"}
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Blockquote
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          bgColor="gray.600"
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Horizontal rule
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          bgColor="gray.600"
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Hard break
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          bgColor="gray.600"
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          bgColor="gray.600"
          _hover={{ bgColor: "gray.500" }}
          color="white"
        >
          Redo
        </Button>
      </HStack>
    </Box>
  );
};
